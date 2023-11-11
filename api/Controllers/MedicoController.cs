using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Dto;

namespace api.Controllers
{
    [Route("api/medico")]
    [ApiController]
    public class MedicoController : ControllerBase
    {
        private readonly SistemaContext _context;

        public MedicoController(SistemaContext context)
        {
            _context = context;
        }

        //Método GET que exibe todas as informações de todos os médicos.
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Medico>>> GetMedicos()
        {
          if (_context.Medicos == null)
          {
              return NotFound();
          }
            return await _context.Medicos.ToListAsync();
        }

        //Método GET que exibe as informações Nome, CRM e Especialidade de todos os médicos.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicoDto>>> GetMedicosDto()
        {
            if (_context.Medicos == null)
            {
                return NotFound();
            }
            var medicos = await _context.Medicos
                                        .Include(m => m.Usuario)
                                        .Select(m => new MedicoDto
                                        {
                                            Nome = m.Usuario.Nome,
                                            CRM = m.CRM,
                                            Especialidade = m.Especialidade                                            
                                        })
                                        .ToListAsync();

            return Ok(medicos);
        }

        // GET: api/medico/5/horarios?data=2023-07-21
        //Retorna uma lista de horários disponíveis para um médico específico em uma data específica.
        [HttpGet("{medicoId}/horarios")]
        public async Task<ActionResult<IEnumerable<string>>> GetHorariosDisponiveis(int medicoId, [FromQuery] DateTime data)
        {
            if (_context.Medicos == null)
            {
                return NotFound("Nenhum médico encontrado.");
            }

            var medico = await _context.Medicos.FindAsync(medicoId);
            if (medico == null)
            {
                return NotFound("Médico não encontrado.");
            }

            // Pegue a data inicial e final do dia solicitado
            var dataInicio = data.Date;
            var dataFim = dataInicio.AddDays(1);

            // Busque todos os agendamentos para esse médico na data solicitada
            var agendamentos = await _context.Consultas
                                              .Where(a => a.MedicoId == medicoId &&
                                                          a.HorarioDisponivel.DataHoraInicio >= dataInicio &&
                                                          a.HorarioDisponivel.DataHoraFim < dataFim)
                                              .ToListAsync();

            // Aqui você precisará definir os horários de trabalho do médico e verificar os horários disponíveis
            // Exemplo: médico trabalha das 9h às 17h e cada consulta dura 1 hora
            List<string> horariosDisponiveis = new List<string>();
            for (DateTime hora = dataInicio.AddHours(9); hora < dataInicio.AddHours(17); hora = hora.AddHours(1))
            {
                if (!agendamentos.Any(a => a.HorarioDisponivel.DataHoraInicio <= hora && a.HorarioDisponivel.DataHoraFim > hora))
                {
                    horariosDisponiveis.Add(hora.ToString("HH:mm"));
                }
            }

            return Ok(horariosDisponiveis);
        }

        // GET: api/Medicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Medico>> GetMedico(int id)
        {
          if (_context.Medicos == null)
          {
              return NotFound();
          }
            var medico = await _context.Medicos.FindAsync(id);

            if (medico == null)
            {
                return NotFound();
            }

            return medico;
        }

        // PUT: api/Medicos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedico(int id, Medico medico)
        {
            if (id != medico.Id)
            {
                return BadRequest();
            }

            _context.Entry(medico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Medicos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Medico>> PostMedico(Medico medico)
        {
          if (_context.Medicos == null)
          {
              return Problem("Entity set 'SistemaContext.Medicos'  is null.");
          }
            _context.Medicos.Add(medico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedico", new { id = medico.Id }, medico);
        }

        //Método POST para cadastrar um novo médico
        [HttpPost]
        [Route("CriaMedico")]
        public IActionResult CriaMedico([FromBody] MedicoCreateDto medicoDto)
        {
            if (medicoDto == null)
            {
                return BadRequest("Dados do médico são obrigatórios.");
            }

            var medico = new Medico
            {
                CRM = medicoDto.CRM,
                Especialidade = medicoDto.Especialidade,
                UsuarioId = medicoDto.UsuarioId
            };

            _context.Set<Medico>().Add(medico);
            _context.SaveChanges();

            return CreatedAtAction(nameof(CriaMedico), new { id = medico.Id }, medico);
        }

        // DELETE: api/Medicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedico(int id)
        {
            if (_context.Medicos == null)
            {
                return NotFound();
            }
            var medico = await _context.Medicos.FindAsync(id);
            if (medico == null)
            {
                return NotFound();
            }

            _context.Medicos.Remove(medico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MedicoExists(int id)
        {
            return (_context.Medicos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

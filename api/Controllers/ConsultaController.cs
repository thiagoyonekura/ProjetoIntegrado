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
    [Route("api/consulta")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private readonly SistemaContext _context;

        public ConsultaController(SistemaContext context)
        {
            _context = context;
        }


        // GET: api/Consultas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultas()
        {
          if (_context.Consultas == null)
          {
              return NotFound();
          }
            return Ok(await _context.Consultas.ToListAsync());
        }

        // GET: api/Consultas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consulta>> GetConsulta(int id)
        {
          if (_context.Consultas == null)
          {
              return NotFound();
          }
            var consulta = await _context.Consultas.FindAsync(id);

            if (consulta == null)
            {
                return NotFound();
            }

            return consulta;
        }

        // GET: api/consulta/agendadas
        //Método GET que exibe todas as Consultas Agendadas de todos os Médicos.
        [HttpGet("agendadas")]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultasAgendadas()
        {
            if (_context.Consultas == null)
            {
                return NotFound();
            }
            var consultasAgendadas = await _context.Consultas
                .Where(c => c.Status == StatusConsulta.Agendado)
                .ToListAsync();

            return Ok(consultasAgendadas);
        }

        // GET: api/consulta/agendadas/medico/{medicoId}
        //Método GET que exibe todas as Consultas Agendadas de um Médico.
        [HttpGet("agendadas/medico/{medicoId}")]
        public async Task<ActionResult<IEnumerable<Consulta>>> GetConsultasAgendadasPorMedico(int medicoId)
        {
            if (_context.Consultas == null)
            {
                return NotFound();
            }
            var consultasAgendadas = await _context.Consultas
                .Where(c => c.Status == StatusConsulta.Agendado && c.MedicoId == medicoId)
                .ToListAsync();

            if (!consultasAgendadas.Any())
            {
                return NotFound($"Nenhuma consulta agendada encontrada para o médico com ID {medicoId}.");
            }

            return Ok(consultasAgendadas);
        }

        // PUT: api/Consultas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsulta(int id, Consulta consulta)
        {
            if (id != consulta.Id)
            {
                return BadRequest();
            }

            _context.Entry(consulta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
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

        // POST: api/Consultas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Consulta>> PostConsulta(Consulta consulta)
        {
          if (_context.Consultas == null)
          {
              return Problem("Entity set 'SistemaContext.Consultas'  is null.");
          }
            _context.Consultas.Add(consulta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConsulta), new { id = consulta.Id }, consulta);
        }

        // DELETE: api/Consultas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsulta(int id)
        {
            if (_context.Consultas == null)
            {
                return NotFound();
            }
            var consulta = await _context.Consultas.FindAsync(id);
            if (consulta == null)
            {
                return NotFound();
            }

            _context.Consultas.Remove(consulta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/consulta/5/cancelar
        [HttpPut("{id}/cancelar")]
        public async Task<IActionResult> CancelarConsulta(int id)
        {
            var consulta = await _context.Consultas
                                         .Include(c => c.HorarioDisponivel)
                                         .FirstOrDefaultAsync(c => c.Id == id);

            if (consulta == null)
            {
                return NotFound();
            }

            if (consulta.Status == StatusConsulta.Cancelado || consulta.Status == StatusConsulta.Concluido)
            {
                return BadRequest("A consulta já está cancelada ou concluída.");
            }

            if ((consulta.DataHora - DateTime.Now).TotalHours < 24)
            {
                return BadRequest("A consulta não pode ser cancelada com menos de 24 horas de antecedência.");
            }

            // Cancela a consulta
            consulta.Status = StatusConsulta.Cancelado;

            // Marca o horário como disponível novamente
            var horario = consulta.HorarioDisponivel;
            if (horario != null)
            {
                horario.Disponivel = true;
                _context.Entry(horario).State = EntityState.Modified;
            }

            // Salva as mudanças no contexto
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ConsultaExists(int id)
        {
            return (_context.Consultas?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

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
    [Route("api/horario")]
    [ApiController]
    public class HorarioController : ControllerBase
    {
        private readonly SistemaContext _context;
        // Suponha que cada horário tem duração de 1 hora e você opera das 9h às 17h
        private readonly TimeSpan _duracaoHorario = TimeSpan.FromHours(1);
        private readonly TimeSpan _inicioJornada = new TimeSpan(9, 0, 0); // 9 AM
        private readonly TimeSpan _fimJornada = new TimeSpan(17, 0, 0); // 5 PM


        public HorarioController(SistemaContext context)
        {
            _context = context;
        }
        // GET: /Horario/medicos/{medicoId}/disponiveis
        [HttpGet("medicos/{medicoId}/disponiveis")]
        public ActionResult<IEnumerable<HorarioDisponivel>> GetHorariosDisponiveis(int medicoId)
        {
            var horariosDisponiveis = _context.HorariosDisponiveis
                                              .Where(h => h.MedicoId == medicoId && h.Disponivel)
                                              .ToList();

            if (!horariosDisponiveis.Any())
            {
                return NotFound("Não foram encontrados horários disponíveis para o médico informado.");
            }

            return Ok(horariosDisponiveis);
        }

        // GET: /Horario/medicos/{medicoId}/indisponiveis
        [HttpGet("medicos/{medicoId}/indisponiveis")]
        public ActionResult<IEnumerable<HorariosIndisponiveisDto>> GetHorariosIndisponiveis(int medicoId)
        {
            var horariosIndisponiveis = _context.Consultas
                                                .Where(c => c.MedicoId == medicoId && c.DataHora >= DateTime.Now)
                                                .Select(c => new HorariosIndisponiveisDto
                                                {
                                                    DataHoraInicio = c.DataHora,
                                                    DataHoraFim = c.DataHora.AddMinutes(60) // Adiciona 60 minutos como duração padrão da consulta'
                                                })
                                                .ToList();

            return Ok(horariosIndisponiveis);
        }
        // GET: api/Horario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HorarioDisponivel>>> GetHorariosDisponiveis()
        {
          if (_context.HorariosDisponiveis == null)
          {
              return NotFound();
          }
            return await _context.HorariosDisponiveis.ToListAsync();
        }

        // GET: api/Horario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HorarioDisponivel>> GetHorarioDisponivel(int id)
        {
          if (_context.HorariosDisponiveis == null)
          {
              return NotFound();
          }
            var horarioDisponivel = await _context.HorariosDisponiveis.FindAsync(id);

            if (horarioDisponivel == null)
            {
                return NotFound();
            }

            return horarioDisponivel;
        }

        // PUT: api/Horario/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHorarioDisponivel(int id, HorarioDisponivel horarioDisponivel)
        {
            if (id != horarioDisponivel.Id)
            {
                return BadRequest("O ID fornecido na URL não coincide com o ID do horário disponível.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna os erros de validação do modelo.
            }

            _context.Entry(horarioDisponivel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HorarioDisponivelExists(id))
                {
                    return NotFound($"Não foi encontrado um horário disponível com o ID {id}.");
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException ex)
            {
                // Capture exceptions related to database updates, like unique constraint violations etc.
                return BadRequest($"Não foi possível atualizar o horário disponível: {ex.Message}");
            }

            return NoContent(); // Retorna um código de status 204 (No Content) para indicar sucesso sem conteúdo a retornar.
        }

        [HttpPost("gerarHorarios/{medicoId}")]
        public async Task<IActionResult> GerarHorariosAutomaticos(int medicoId, DateTime data)
        {
            // Verificar se a data é válida
            if (data.Date < DateTime.Now.Date)
            {
                return BadRequest("Não é possível gerar horários para uma data passada.");
            }

            // Verificar se o médico existe
            var medico = await _context.Medicos.FindAsync(medicoId);
            if (medico == null)
            {
                return NotFound($"Médico com ID {medicoId} não encontrado.");
            }

            // Buscar horários indisponíveis para o médico específico
            var result = GetHorariosIndisponiveis(medicoId);
            if (!(result.Result is OkObjectResult okResult))
            {
                return result.Result; // Retorna o mesmo erro de GetHorariosIndisponiveis
            }

            var horariosIndisponiveis = (List<HorariosIndisponiveisDto>)okResult.Value;

            List<HorarioDisponivel> horariosDisponiveis = new List<HorarioDisponivel>();
            TimeSpan horarioAtual = _inicioJornada;

            while (horarioAtual < _fimJornada)
            {
                DateTime horarioCompleto = data.Date + horarioAtual;

                // Verificar se o horário atual não está nos horários indisponíveis
                if (!horariosIndisponiveis.Any(indisponivel => horarioCompleto >= indisponivel.DataHoraInicio && horarioCompleto < indisponivel.DataHoraFim))
                {
                    horariosDisponiveis.Add(new HorarioDisponivel
                    {
                        MedicoId = medicoId,
                        DataHoraInicio = horarioCompleto,
                        DataHoraFim = horarioCompleto.Add(_duracaoHorario)
                    });
                }

                // Incrementa para o próximo horário
                horarioAtual = horarioAtual.Add(_duracaoHorario);
            }

            // Salvar os horários disponíveis no banco de dados
            await _context.HorariosDisponiveis.AddRangeAsync(horariosDisponiveis);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHorariosDisponiveis), new { medicoId = medicoId }, horariosDisponiveis);
        }

        // POST: api/Horario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HorarioDisponivel>> PostHorarioDisponivel(HorarioDisponivel horarioDisponivel)
        {
          if (_context.HorariosDisponiveis == null)
          {
              return Problem("Entity set 'SistemaContext.HorariosDisponiveis'  is null.");
          }
            _context.HorariosDisponiveis.Add(horarioDisponivel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHorarioDisponivel", new { id = horarioDisponivel.Id }, horarioDisponivel);
        }

        // DELETE: api/Horario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHorarioDisponivel(int id)
        {
            if (_context.HorariosDisponiveis == null)
            {
                return NotFound();
            }
            var horarioDisponivel = await _context.HorariosDisponiveis.FindAsync(id);
            if (horarioDisponivel == null)
            {
                return NotFound();
            }

            _context.HorariosDisponiveis.Remove(horarioDisponivel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HorarioDisponivelExists(int id)
        {
            return _context.HorariosDisponiveis.Any(e => e.Id == id);
        }
    }
}

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
    [Route("api/paciente")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private readonly SistemaContext _context;

        public PacienteController(SistemaContext context)
        {
            _context = context;
        }

        /*método GET que recebe o ID do paciente e retorna uma lista de DTOs
        com o histórico de agendamentos desse paciente.*/
        [HttpGet("relatorio/{pacienteId}")]
        public async Task<ActionResult<IEnumerable<RelatorioAgendamentoDto>>> GetRelatorioPaciente(int pacienteId)
        {
            var paciente = await _context.Pacientes
                                         .Include(p => p.Consultas)
                                         .ThenInclude(c => c.Medico)
                                         .FirstOrDefaultAsync(p => p.Id == pacienteId);

            if (paciente == null)
            {
                return NotFound(new { message = "Paciente não encontrado." });
            }

            var relatorio = paciente.Consultas.Select(c => new RelatorioAgendamentoDto
            {
                ConsultaId = c.Id,
                DataHora = c.DataHora,
                NomePaciente = paciente.Usuario.Nome, // assumindo que você tenha a propriedade Nome no Usuario relacionado ao Paciente
                NomeMedico = c.Medico.Usuario.Nome,
                Status = c.Status
            }).ToList();

            return Ok(relatorio);
        }


        // GET: api/Pacientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> GetPacientes()
        {
          if (_context.Pacientes == null)
          {
              return NotFound();
          }
            return await _context.Pacientes.ToListAsync();
        }

        // GET: api/Pacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
          if (_context.Pacientes == null)
          {
              return NotFound();
          }
            var paciente = await _context.Pacientes
                            .Include(p => p.Consultas)
                            .Include(p => p.Usuario)
                            .FirstOrDefaultAsync(p => p.Id == id);

            if (paciente == null)
            {
                return NotFound();
            }

            return paciente;
        }

        // PUT: api/Pacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(int id, Paciente paciente)
        {
            if (id != paciente.Id)
            {
                return BadRequest();
            }

            _context.Entry(paciente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacienteExists(id))
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

        // POST: api/Pacientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Paciente>> PostPaciente(Paciente paciente)
        {
          if (_context.Pacientes == null)
          {
              return Problem("Entity set 'SistemaContext.Pacientes'  is null.");
          }
            _context.Pacientes.Add(paciente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaciente", new { id = paciente.Id }, paciente);
        }

        // DELETE: api/Pacientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaciente(int id)
        {
            if (_context.Pacientes == null)
            {
                return NotFound();
            }
            var paciente = await _context.Pacientes.FindAsync(id);
            if (paciente == null)
            {
                return NotFound();
            }

            _context.Pacientes.Remove(paciente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PacienteExists(int id)
        {
            return (_context.Pacientes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

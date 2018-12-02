using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatinApp.API.Data;
using DatinApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatinApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]

        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetAllUsers();
            var userstoreturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(userstoreturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var usertoreturn = _mapper.Map<UserForDetaileddto>(user);
            return Ok(usertoreturn);
        }
    }
}
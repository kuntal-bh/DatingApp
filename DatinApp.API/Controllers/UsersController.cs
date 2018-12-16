using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatinApp.API.Data;
using DatinApp.API.Dtos;
using DatinApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatinApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
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

        public async Task<IActionResult> GetUsers([FromQuery]UserParams userparams)
        {
            var users = await _repo.GetAllUsers(userparams);
            var userstoreturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPaginationHeader(users.CurrentPage,users.PageSize,users.TotalPages,users.TotalItems);
            return Ok(userstoreturn);
        }

        [HttpGet("{id}",Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var usertoreturn = _mapper.Map<UserForDetaileddto>(user);
            return Ok(usertoreturn);
        }
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateUser (int id, Userforupdatedto userforupdate) {

         if(id != int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value)){
              return Unauthorized();
        }

            var userfromrepo = await _repo.GetUser(id);
            _mapper.Map(userforupdate,userfromrepo);

            if(await _repo.SaveAll()){
                return NoContent();
            }

            throw new System.Exception();

        }

    }
}
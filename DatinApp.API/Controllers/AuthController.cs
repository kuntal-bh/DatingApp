using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatinApp.API.Data;
using DatinApp.API.Dtos;
using DatinApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatinApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo , IConfiguration config ,IMapper mapper)
        {
            this._repo = repo;
            _config = config;
            _mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register (UserforRegisterDto userforregisterDto)
        {
            userforregisterDto.Username = userforregisterDto.Username.ToLower();
            if(await _repo.UserExists(userforregisterDto.Username))
            return BadRequest();

            var usertobeCreated = _mapper.Map<User>(userforregisterDto);

            var created = await _repo.Register(usertobeCreated , userforregisterDto.Password);

            var usertoreturn = _mapper.Map<UserForDetaileddto>(created);

            return CreatedAtRoute("GetUser",new {Controller ="User" ,created.ID},usertoreturn);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login (UserforLoginDto userforLoginDto)
        {
            var userforLog = await _repo.Login(userforLoginDto.Username.ToLower(), userforLoginDto.Password);

            if(userforLog ==null)
            {
                return Unauthorized();
            }

            var claims = new [] 
            {
                new Claim(ClaimTypes.NameIdentifier,userforLog.ID.ToString()),
                new Claim(ClaimTypes.Name,userforLog.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject =  new ClaimsIdentity(claims),
                SigningCredentials = creds,
                Expires = DateTime.Now.AddDays(1)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token  = tokenHandler.CreateToken(tokenDescripter); 

            var userDto = _mapper.Map<UserForDetaileddto>(userforLog);

            return Ok(new{
                token = tokenHandler.WriteToken(token), 
                userDto
            });
        }
    }
}
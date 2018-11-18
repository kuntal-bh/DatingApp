using System.ComponentModel.DataAnnotations;

namespace DatinApp.API.Dtos
{
    public class UserforLoginDto
    {
        
        public string Username { get; set; }
        
        
        public string Password { get; set; }
    }
}
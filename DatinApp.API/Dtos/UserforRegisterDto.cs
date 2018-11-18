using System.ComponentModel.DataAnnotations;

namespace DatinApp.API.Dtos
{
    public class UserforRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4,ErrorMessage = "Password must be between 4 to 8 characters")]
        public string Password { get; set; }
    }
}
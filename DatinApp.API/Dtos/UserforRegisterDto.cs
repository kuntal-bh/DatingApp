using System;
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
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public DateTime DateofBirth { get; set; }
        
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserforRegisterDto()
        {
            Created = DateTime.Now;
            LastActive =DateTime.Now;
        }
    }
}
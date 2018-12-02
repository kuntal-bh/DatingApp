using System.Collections.Generic;
using DatinApp.API.Models;
using Newtonsoft.Json.Serialization;
namespace DatinApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUser(){
        
        var filedata = System.IO.File.ReadAllText("Data/Userseed.json");
        var users = Newtonsoft.Json.JsonConvert.DeserializeObject<List<User>>(filedata);
        foreach (var user in users)
        {
             byte[] passwordHash , passwordSalt ; 
            CreatePassword("password" , out passwordHash , out passwordSalt);
            user.PasswordHash = passwordHash ; 
            user.PasswordSalt = passwordSalt;
            user.UserName = user.UserName.ToLower();

            _context.Users.Add(user);
        }

        _context.SaveChanges();

        }

         private void CreatePassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key ; 
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
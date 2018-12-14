using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatinApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatinApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        

        public DatingRepository(DataContext context)
        {
            _context = context;
           
        }
        public void Add<T>(T entities) where T : class
        {
            _context.Add(entities);
        }

        public void Delete<T>(T entities) where T : class
        {
            _context.Remove(entities);
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _context.Users.Include(p=>p.Photos).ToListAsync();
            return users;
        }

        public async Task<Photo> GetMainPhoto(int userId)
        {
            return await _context.Photos.Where(u=>u.user.ID ==userId).FirstOrDefaultAsync(p=>p.isMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x=>x.Id ==id);
            return photo;
        }

        public async Task<User> GetUser(int Id)
        {
            var user = await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x=>x.ID ==Id);          
            return user;
        }

        public  async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync() >0;
        }
    }
}
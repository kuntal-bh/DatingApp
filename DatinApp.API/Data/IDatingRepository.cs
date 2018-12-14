using System.Collections.Generic;
using System.Threading.Tasks;
using DatinApp.API.Models;

namespace DatinApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T> (T entities) where T: class ;
         void Delete<T>(T entities) where T:class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetAllUsers();

         Task<User> GetUser(int Id);

         Task<Photo> GetPhoto(int id);

         Task<Photo> GetMainPhoto (int userId);
         
    }
}
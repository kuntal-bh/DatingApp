using System.Linq;
using AutoMapper;
using DatinApp.API.Dtos;
using DatinApp.API.Models;

namespace DatinApp.API.Helpers
{
    public class AutomapperProfile :Profile
    {
        public AutomapperProfile()
        {
            CreateMap<User,UserForListDto>().ForMember(dest=>dest.PhotoUrl ,opt=>{
               opt.MapFrom(src =>src.Photos.FirstOrDefault(p=>p.isMain).Url); 
            })
            .ForMember(dest =>dest.Age,opt=>{
                opt.ResolveUsing(src=>src.DateofBirth.CalculateAge());
            });
            CreateMap<User,UserForDetaileddto>().ForMember(dest=>dest.PhotoUrl ,opt=>{
                opt.MapFrom(src =>src.Photos.FirstOrDefault(p=>p.isMain).Url);
            }).ForMember(dest =>dest.Age,opt=>{
                opt.ResolveUsing(src=>src.DateofBirth.CalculateAge());
            });;
            CreateMap<Photo,PhotosDto>();
            CreateMap<Userforupdatedto,User>();
            CreateMap<PhotosforCreationdto,Photo>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<UserforRegisterDto,User>();
            
        }
    }
}
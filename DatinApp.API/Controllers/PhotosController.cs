using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatinApp.API.Data;
using DatinApp.API.Dtos;
using DatinApp.API.Helpers;
using DatinApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatinApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _options;
        public Cloudinary _cloudinary ;

        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> options)
        {
            _mapper = mapper;
            _options = options;
            _repo = repo;

            Account acc = new Account(

                _options.Value.CloudName,
                _options.Value.ApiKey,
                _options.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

         [HttpGet("{id}",Name ="GetPhoto")] 
          public async Task<IActionResult> GetPhoto(int id ) {
            //Get Photo from DB after public ID generated ......
            var photofromRepo = await _repo.GetPhoto(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photofromRepo);

            return Ok(photo);
        }

        [HttpPost]

        public async Task<IActionResult>  UploadPhotos (int userId ,[FromForm] PhotosforCreationdto photostocreatedto){
           
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var userfromrepo = await _repo.GetUser(userId);

            var imageFile = photostocreatedto.File;

            var uploadImage = new ImageUploadResult();

            if(imageFile.Length>0){
                using( var stream = imageFile.OpenReadStream())
                {
                    var imageparams = new ImageUploadParams()
                    {
                        File = new FileDescription(imageFile.Name,stream),
                        Transformation = new Transformation().Width(500).Height(500).Gravity("face").Crop("fill")
                    };

                 uploadImage = _cloudinary.Upload(imageparams);
                };
            }

            photostocreatedto.Url = uploadImage.Uri.ToString();
            photostocreatedto.publicId = uploadImage.PublicId;

            var photo = _mapper.Map<Photo>(photostocreatedto);

            if(!userfromrepo.Photos.Any(s=>s.isMain)){
                photo.isMain = true;
            }
          
          userfromrepo.Photos.Add(photo);

          if(await _repo.SaveAll()){
               var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
              //return a new URi after creating photo 
              return CreatedAtRoute("GetPhoto",new{id =photo.Id },photoToReturn);
          }

          return BadRequest("Could not add Photoes");
            
    }

    [HttpPost("{id}/setmain")] 

    public async Task<IActionResult> SetMainPhoto (int userId , int id) {
           if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var userfromRepo = await _repo.GetUser(userId);

            if(!userfromRepo.Photos.Any(p=> p.Id ==id)) {
                return Unauthorized();
            }

            var photofromRepo = await _repo.GetPhoto(id);

            if(photofromRepo.isMain) {
                return BadRequest("Photo is already main");
            }

            var getMainPhoto = await _repo.GetMainPhoto(userId);
            getMainPhoto.isMain= false;
            photofromRepo.isMain = true;

            if( await _repo.SaveAll())
            return NoContent();

            return BadRequest("Could not set main photo");


    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePhoto(int userId,int id) {
         if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var userfromRepo = await _repo.GetUser(userId);
             if(!userfromRepo.Photos.Any(p=> p.Id ==id)) {
                return Unauthorized();
            }

            var photofromRepo = await _repo.GetPhoto(id);

            if(photofromRepo.isMain) {
                return BadRequest("You cannot delete your main photo");
            }

            if(photofromRepo.PublicId !=null)
            {
            var deletparams = new DeletionParams(photofromRepo.PublicId);

            var result = _cloudinary.Destroy(deletparams);

            if(result.Result=="ok"){
                _repo.Delete(photofromRepo);
            }
            }
             if(photofromRepo.PublicId ==null) {
                  _repo.Delete(photofromRepo);
             }

          if(await _repo.SaveAll()) {
              return Ok();
          }

          return BadRequest("Failed to delete the photo");
    }
    }
}
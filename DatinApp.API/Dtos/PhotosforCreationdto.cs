using System;
using Microsoft.AspNetCore.Http;

namespace DatinApp.API.Dtos
{
    public class PhotosforCreationdto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        public string publicId { get; set; }

        public PhotosforCreationdto()
        {
            DateAdded = DateTime.Now;
        }
    }
}
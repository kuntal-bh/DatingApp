using System;

namespace DatinApp.API.Dtos
{
    public class PhotosDto
    {
        public int Id { get; set; }

        public string Url { get; set; }
        public string description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool isMain { get; set; }

    }
}
using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatinApp.API.Helpers
{
    public static class Extension
    {
        public static void AddApplicationError(this HttpResponse response , string message){
            response.Headers.Add("Application-error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }

        public static void AddPaginationHeader (this HttpResponse response , int currentPage , 
        int itemsperpage , int totalpages , int totalitems ) {

            var paginationheader = new PaginationHeader(currentPage,itemsperpage,totalpages,totalitems);
            var serializesetting = new JsonSerializerSettings();
            serializesetting.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationheader,serializesetting));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }

        public static int CalculateAge(this DateTime dateTime){
            var age =DateTime.Today.Year- dateTime.Year  ;
            return age;
        }
    }
}
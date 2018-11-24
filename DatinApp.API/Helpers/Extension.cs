using Microsoft.AspNetCore.Http;

namespace DatinApp.API.Helpers
{
    public static class Extension
    {
        public static void AddApplicationError(this HttpResponse response , string message){
            response.Headers.Add("Application-error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}
namespace DatinApp.API.Helpers
{
    public class UserParams
    {
        private const int maxpagesize = 50 ; 
        public int PageNumber { get; set; } = 1;

        private int pageSize =10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value>maxpagesize) ? maxpagesize : value;}
        }

        public int userId { get; set; }

        public string Gender { get; set; }

        public int MinAge { get; set; } =18;
        public int MaxAge { get; set; } =99;
        
    }
}
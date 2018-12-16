namespace DatinApp.API.Helpers
{
    public class PaginationHeader
    {
        public int ItemsperPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }

        public PaginationHeader(int currentPage , int itemsperpage , int totalpages , int totalitems)
        {
            this.CurrentPage = currentPage;
            this.ItemsperPage = itemsperpage;
            this.TotalItems = totalitems;
            this.TotalPages = totalpages;
        }
    }
}
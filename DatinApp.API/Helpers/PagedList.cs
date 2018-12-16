using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatinApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }

        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

   public PagedList(List<T> items , int itemCounts , int pagesize, int currentpage )
    {
        TotalItems = itemCounts;
        PageSize = pagesize;
        CurrentPage = currentpage;
        TotalPages = (int)(Math.Ceiling(itemCounts/ (double) pagesize));
        this.AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync (IQueryable<T> source , 
    int pagenumber , int pagesize ){
        var totalcount = await source.CountAsync();
        var items = await source.Skip((pagenumber-1) * pagesize).Take(pagesize).ToListAsync();

        return (new PagedList<T>(items, totalcount,pagesize,pagenumber));

    }

    }

    
}
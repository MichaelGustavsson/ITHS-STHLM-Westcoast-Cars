using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vehicles_API.ViewModels
{
    public class ResponseViewModel
    {
        public string? Data { get; set; }
        public int StatusCode { get; set; }
        public int Count { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
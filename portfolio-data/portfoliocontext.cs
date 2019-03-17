using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace portfolio_data
{
    public class PortfolioContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }

        public PortfolioContext(DbContextOptions<PortfolioContext> options) : base(options)
        {}
    }
}

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace portfolio_API
{
    public class PortfolioContext : DbContext
    {
        public DbSet<Article> Articles { get; set; }

        public PortfolioContext(DbContextOptions<PortfolioContext> options) : base(options)
        {}
    }
}

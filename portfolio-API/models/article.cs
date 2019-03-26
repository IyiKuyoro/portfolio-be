namespace portfolio_API
{
    public class Article
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Link { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}

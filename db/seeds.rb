ActiveRecord::Base.transaction do
  STDOUT.puts "WARNING: This operation will erase ALL Posts and Paragraphs. Type 'OK' to continue:"
  input = STDIN.gets.strip
  if input == 'OK'
    paragraphs_count = Paragraph.count
    posts_count = Post.count

    Paragraph.destroy_all
    Post.destroy_all

    STDOUT.puts "Destroyed #{posts_count} posts and #{paragraphs_count} paragraphs"

    (1..100).map do |i|
      p = Post.create(title: "Test Post #{i}", status: 'published', author: User.all.sample, created_by: User.all.sample)
      (1..10).map do |j|
        Paragraph.create(body: "Paragraph #{11 - j}: Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium", post: p, style: Paragraph::STYLES.sample)
      end
    end
    STDOUT.puts "Created #{Post.count} posts and #{Paragraph.count} paragraphs"
  else
    STDOUT.puts "Skipped"
  end
end

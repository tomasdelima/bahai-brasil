class AddOrderingToParagraph < ActiveRecord::Migration
  def self.up
    add_column :paragraphs, :ordering, :integer

    Post.all.map do |post|
      ordering = 1
      post.paragraphs.map do |paragraph|
        paragraph.update_attribute :ordering, ordering
        ordering += 1
      end
    end
  end

  def self.down
    remove_column :paragraphs, :ordering
  end
end

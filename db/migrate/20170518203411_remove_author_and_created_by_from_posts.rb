class RemoveAuthorAndCreatedByFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :created_by_id, :author_id
  end
end

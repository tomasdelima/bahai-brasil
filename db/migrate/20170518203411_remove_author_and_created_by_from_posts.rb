class RemoveAuthorAndCreatedByFromPosts < ActiveRecord::Migration[4.2]
  def change
    remove_column :posts, :created_by_id, :author_id
  end
end

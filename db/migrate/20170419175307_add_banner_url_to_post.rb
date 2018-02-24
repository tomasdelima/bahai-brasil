class AddBannerUrlToPost < ActiveRecord::Migration[4.2]
  def change
    add_column :posts, :banner_url, :string
  end
end

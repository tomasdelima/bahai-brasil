class AddBannerUrlToPost < ActiveRecord::Migration
  def change
    add_column :posts, :banner_url, :string
  end
end

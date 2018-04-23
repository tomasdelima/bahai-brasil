class AddBannerUrlToHomePage < ActiveRecord::Migration[5.1]
  def change
    add_column :home_pages, :banner_url, :string
  end
end

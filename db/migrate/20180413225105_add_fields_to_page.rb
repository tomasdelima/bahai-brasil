class AddFieldsToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :banner_url, :string
    add_column :pages, :quote, :text
    add_column :pages, :author, :string
  end
end

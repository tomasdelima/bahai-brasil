class AddParentPageToPages < ActiveRecord::Migration[5.1]
  def change
    # add_reference :pages, :parent_page, foreign_key: true
    add_column :pages, :parent_page_id, :integer
  end
end

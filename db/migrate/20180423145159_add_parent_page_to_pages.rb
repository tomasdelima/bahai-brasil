class AddParentPageToPages < ActiveRecord::Migration[5.1]
  def change
    add_reference :pages, :parent_page, foreign_key: true
  end
end

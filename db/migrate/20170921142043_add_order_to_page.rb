class AddOrderToPage < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :order, :integer
  end
end

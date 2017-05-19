class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :token
      t.string :os

      t.timestamps null: false
    end
  end
end

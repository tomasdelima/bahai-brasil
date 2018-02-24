class CreatePosts < ActiveRecord::Migration[4.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :status
      t.references :created_by, index: true, references: :users
      t.references :author, index: true, references: :users

      t.timestamps null: false
    end
  end
end

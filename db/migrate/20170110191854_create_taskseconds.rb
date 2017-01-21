class CreateTaskseconds < ActiveRecord::Migration
  def change
    create_table :taskseconds do |t|
      t.float :price
      t.string :name
      t.boolean :real
      t.timestamps null: false
    end
  end
end

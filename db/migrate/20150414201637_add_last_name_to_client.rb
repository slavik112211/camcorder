class AddLastNameToClient < ActiveRecord::Migration
  def change
    rename_column :clients, :name, :first_name
    add_column :clients, :last_name, :string
  end
end

defmodule Api.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.User

  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :phone, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :phone, :password_hash])
    |> validate_required([:username, :email, :phone, :password_hash])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end
end

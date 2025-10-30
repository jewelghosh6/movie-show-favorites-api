import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import { Optional } from "sequelize";

interface FavoriteAttributes {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: number;
  location: string;
  duration: string;
  year_or_time: string;
}

type FavoriteCreationAttributes = Optional<FavoriteAttributes, "id">;

@Table({ tableName: "favorites" })
export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.ENUM("Movie", "TV Show"))
  type!: "Movie" | "TV Show";

  @Column(DataType.STRING)
  director!: string;

  @Column(DataType.FLOAT)
  budget!: number;

  @Column(DataType.STRING)
  location!: string;

  @Column(DataType.STRING)
  duration!: string;

  @Column(DataType.STRING)
  year_or_time!: string;
}

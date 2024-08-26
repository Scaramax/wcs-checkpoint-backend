import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: ["error", "query"],
    entities: [Country],
});

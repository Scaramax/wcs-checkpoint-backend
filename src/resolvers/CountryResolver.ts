import {Country} from "../entities/Country";
import {Arg, Field, InputType, Mutation, Query, Resolver} from "type-graphql";

@InputType()
class NewCountryInput {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    flag: string;

    @Field()
    continent: string;
}

@Resolver(Country)
class CountryResolver {

    @Query(() => [Country])
    async getAllCountries() {
        return await Country.find();
    }

    @Query(() => [Country])
    async getCountryByCode(@Arg("code") code: string) {
        return await Country.find({where: {code}});
    }

    @Query(() => [Country])
    async getCountriesByContinent(@Arg("continent") continent: string) {
        return await Country.find({where: {continent}});
    }

    @Mutation(() => Country)
    async createNewCountry(@Arg("data") newCountryData: NewCountryInput) {

        // Reject if country with the same name or code already exists
        const existingCountry = await Country.findOne({
            where: [
                {name: newCountryData.name},
                {code: newCountryData.code},
            ],
        });

        if (existingCountry) {
            throw new Error("Country already exists");
        }

        // Ensure that the continent exists
        const continents = ['Afrique', 'Amerique', 'Antarctique', 'Asie', 'Europe', 'Oceanie'];
        if (!continents.includes(newCountryData.continent)) {
            throw new Error("Invalid continent, use one of the following : 'Afrique', 'Amerique', 'Antarctique', 'Asie', 'Europe', 'Oceanie'");
        }

        return await Country.save({...newCountryData});
    }
}

export default CountryResolver;

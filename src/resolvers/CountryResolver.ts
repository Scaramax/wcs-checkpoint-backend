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

        return await Country.save({...newCountryData});
    }
}

export default CountryResolver;

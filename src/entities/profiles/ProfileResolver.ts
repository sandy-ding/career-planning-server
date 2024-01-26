import { Resolver, Arg, Mutation, Ctx, Query } from "type-graphql";
import { Profile } from "./Profile";
import { ProfileMutationRequest } from "./ProfileMutationRequest";
import profileModel from "./ProfileModel";
import { Types } from "mongoose";

@Resolver(Profile)
export class ProfileResolver {
  @Query(() => Profile, { nullable: true })
  public async profile(@Ctx("userId") userId: string): Promise<Profile> {
    let profile = await profileModel.findById(userId);
    return profile;
  }

  @Mutation(() => Profile)
  public async updateProfile(
    @Ctx("userId") userId: string,
    @Arg("input")
    input: ProfileMutationRequest
  ): Promise<Profile> {
    let profile = await profileModel.findById(userId);
    if (!profile) {
      profile = await profileModel.create<Profile>({
        _id: new Types.ObjectId(userId),
        ...input,
        createdOn: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      profile = await profileModel.findByIdAndUpdate(
        userId,
        {
          ...input,
          updatedAt: Date.now(),
        },
        { new: true }
      );
    }

    return profile;
  }
}

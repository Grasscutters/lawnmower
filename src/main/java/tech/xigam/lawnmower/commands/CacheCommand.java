package tech.xigam.lawnmower.commands;

import net.dv8tion.jda.api.interactions.commands.OptionType;
import tech.xigam.cch.command.Arguments;
import tech.xigam.cch.command.Command;
import tech.xigam.cch.utils.Argument;
import tech.xigam.cch.utils.Interaction;
import tech.xigam.lawnmower.utils.CacheUtil;
import tech.xigam.lawnmower.utils.MessageUtil;

import java.util.Collection;
import java.util.List;

public final class CacheCommand extends Command implements Arguments {
    public CacheCommand() {
        super("cache", "Manage the GM Handbook cache.");
    }

    @Override
    public void execute(Interaction interaction) {
        if(!interaction.getMember().getId().matches("252090676068614145")) {
            interaction.setEphemeral(true).reply(MessageUtil.genericEmbed("You cannot manage the cache!")); return;
        }
        
        String action = interaction.getArgument("perform", String.class);
        switch(action) {
            default -> interaction.setEphemeral(true).reply(MessageUtil.genericEmbed("Invalid action!"));
            case "update" -> {
                // Defer as we are performing file system actions.
                interaction.setEphemeral(true).deferReply();

                CacheUtil.cacheData(); // Cache the data from the GM Handbook.
                CacheUtil.readFromCache(); // Read the data from the cache.
                interaction.reply(MessageUtil.genericEmbed("Cache updated!"));
            }
        }
    }

    @Override
    public Collection<Argument> getArguments() {
        return List.of(
                Argument.createWithChoices("perform", "The action to perform on the cache.", "perform", OptionType.STRING, true, 0, "update")
        );
    }
}

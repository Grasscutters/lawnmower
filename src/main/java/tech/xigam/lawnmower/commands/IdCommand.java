package tech.xigam.lawnmower.commands;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import tech.xigam.cch.command.Arguments;
import tech.xigam.cch.command.Command;
import tech.xigam.cch.command.Completable;
import tech.xigam.cch.utils.Argument;
import tech.xigam.cch.utils.Completion;
import tech.xigam.cch.utils.Interaction;
import tech.xigam.lawnmower.utils.CacheUtil;
import tech.xigam.lawnmower.utils.MessageUtil;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;

public final class IdCommand extends Command implements Arguments, Completable {
    public IdCommand() {
        super("id", "Find the ID from a string.");
    }

    @Override
    public void execute(Interaction interaction) {
        String objectName = interaction.getArgument("object", String.class);
        int itemId = CacheUtil.getIdOfObject(objectName);

        EmbedBuilder embed = new EmbedBuilder().setColor(MessageUtil.EMBED_COLOR)
                .setTitle(objectName)
                .setTimestamp(OffsetDateTime.now())
                .setDescription("**" + objectName + "** has the ID of **" + itemId + "**.");
        interaction.setEphemeral(true).reply(embed.build());
    }

    @Override
    public void complete(Completion completion) {
        String input = completion.getInput();
        List<String> results = CacheUtil.cache.map.keySet().stream()
                .filter(key -> key.toLowerCase().contains(input.toLowerCase()))
                .toList();
        for(int i = 0; i < Math.min(results.size(), 5); i++) {
            String result = results.get(i);
            if(result.trim().length() < 1) continue;
            completion.addChoice(result, result);
        } completion.reply();
    }

    @Override
    public Collection<Argument> getArguments() {
        return List.of(
                Argument.createTrailingArgument("object", "The object to find the ID of.", "object", OptionType.STRING, true, 0)
                        .completable(true)
        );
    }
}

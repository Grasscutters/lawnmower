package tech.xigam.lawnmower.commands;

import net.dv8tion.jda.api.entities.MessageEmbed;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import tech.xigam.cch.command.Arguments;
import tech.xigam.cch.command.Command;
import tech.xigam.cch.utils.Argument;
import tech.xigam.cch.utils.Interaction;
import tech.xigam.lawnmower.utils.MessageUtil;

import java.util.Collection;
import java.util.List;

public final class HelpCommand extends Command implements Arguments {
    static final String[] QUESTIONS = {
            "everything!",
            "finding the repository",
            "installing Grasscutter"
    };
    
    public HelpCommand() {
        super("help", "Displays helpful information.");
    }

    @Override
    public void execute(Interaction interaction) {
        var question = interaction.getArgument("with", "everything!", String.class);
        interaction.setEphemeral(true).deferReply(); interaction.reply(this.response(question));
    }
    
    private MessageEmbed response(String question) {
        return switch(question) {
            default -> MessageUtil.genericEmbed("Excuse me, what? I don't understand your question.");
            case "everything!" -> MessageUtil.genericEmbed("""
                    **Grasscutters**: An *unofficial* community server for the Grasscutter private server.
                                        
                    **Permanent Invite Link**: <https://discord.gg/T5vZU6UyeG>
                    **GitHub Repository**: <https://github.com/Melledy/Grasscutter>
                    **Trello Board**: <https://trello.com/b/ij3ICC8K/features>
                    """);
            case "finding the repository" -> MessageUtil.genericEmbed("The repository is located [here](https://github.com/Melledy/Grasscutter)!");
            case "installing Grasscutter" -> MessageUtil.genericEmbed("There is an installation guide located [here](https://github.com/Melledy/Grasscutter/wiki/Running#prerequisites).");
        };
    }

    @Override
    public Collection<Argument> getArguments() {
        return List.of(
                Argument.createWithChoices("with", "What do you need help with?", "with", OptionType.STRING, false, 0, QUESTIONS)
        );
    }
}

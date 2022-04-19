package tech.xigam.lawnmower;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.requests.GatewayIntent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tech.xigam.cch.ComplexCommandHandler;
import tech.xigam.cch.defaults.DeployCommand;
import tech.xigam.cch.utils.Interaction;
import tech.xigam.lawnmower.commands.CacheCommand;
import tech.xigam.lawnmower.commands.HelpCommand;
import tech.xigam.lawnmower.commands.IdCommand;
import tech.xigam.lawnmower.utils.CacheUtil;
import tech.xigam.lawnmower.utils.MessageUtil;

import java.util.EnumSet;

public final class Lawnmower {
    private static final Logger logger = LoggerFactory.getLogger(Lawnmower.class);
    private static final ComplexCommandHandler commandHandler = new ComplexCommandHandler(false);
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static JDA jda;
    
    static {
        CacheUtil.readFromCache();
    }
    
    public static void main(String[] args) {
        if(args.length < 1) {
            logger.error("Usage: java -jar lawnmower.jar <bot token>");
            System.exit(1);
        }
        
        String token = args[0];
        try {
            jda = JDABuilder.create(token, EnumSet.allOf(GatewayIntent.class))
                    .setActivity(Activity.listening("people cutting grass"))
                    .build();
            
            commandHandler.setJda(jda);
            registerCommands();
        } catch (Exception exception) {
            logger.error("Failed to start bot.", exception);
        }
    }

    /**
     * Called to register commands into the handler.
     */
    private static void registerCommands() {
        // First handle errors.
        commandHandler.onArgumentError = interaction -> {
            interaction.reply(MessageUtil.genericEmbed("Not enough arguments were provided!"));
        };
        
        commandHandler.registerCommand(new DeployCommand() {
            @Override
            protected boolean permissionCheck(Interaction interaction) {
                return interaction.getMember().getId().matches("252090676068614145");
            }
        });
        commandHandler.registerCommand(new HelpCommand());
        commandHandler.registerCommand(new CacheCommand());
        commandHandler.registerCommand(new IdCommand());
    }

    /**
     * Application logger.
     */
    public static Logger getLogger() {
        return logger;
    }

    /**
     * JDA instance.
     */
    public static JDA getJda() {
        return jda;
    }

    /**
     * Gson instance.
     */
    public static Gson getGson() {
        return gson;
    }
}

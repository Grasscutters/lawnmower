package tech.xigam.lawnmower.utils;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.MessageEmbed;

import java.awt.*;
import java.time.OffsetDateTime;

public final class MessageUtil {
    public static final Color EMBED_COLOR = new Color(3, 252, 65);
    
    /**
     * Creates a generic message embed.
     * @param description The text of the embed.
     */
    
    public static MessageEmbed genericEmbed(String description) {
        return new EmbedBuilder().setColor(EMBED_COLOR)
                .setDescription(description)
                .build();
    }

    /**
     * Creates a generic message embed with a timestamp.
     * @param description The text of the embed.
     */
    
    public static MessageEmbed genericTimestamp(String description) {
        return new EmbedBuilder().setColor(EMBED_COLOR)
                .setDescription(description)
                .setTimestamp(OffsetDateTime.now())
                .build();
    }
}

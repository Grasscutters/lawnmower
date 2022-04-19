package tech.xigam.lawnmower.utils;

import tech.xigam.lawnmower.Lawnmower;
import tech.xigam.lawnmower.objects.Cache;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public final class CacheUtil {
    public static Cache cache = new Cache();
    
    static final File CACHE_FILE = new File("cache.json");
    static final File HANDBOOK_FILE = new File("GM_Handbook.txt");
    
    public static void readFromCache() {
        if(!CACHE_FILE.exists()) return;
        cache = Lawnmower.getGson().fromJson(CacheUtil.readFromFile(CACHE_FILE), Cache.class);
    }
    
    public static void cacheData() {
        if(!HANDBOOK_FILE.exists())
            throw new IllegalStateException("Handbook file does not exist!");
        
        String handbookContent = CacheUtil.readFromFile(HANDBOOK_FILE);
        String[] linesArray = handbookContent.split(System.lineSeparator());
        List<String> lines = new ArrayList<>(List.of(linesArray));
        lines.subList(0, 4); // Remove first 4 lines.
        
        for(var line : lines) {
            String[] split = line.split(" : ");
            if(split.length < 2) continue;
            
            String id = split[0]; String name = split[1];
            cache.map.put(name.replaceAll("[^A-Za-z\\d ]", ""), Integer.parseInt(id));
        }
        
        Lawnmower.getLogger().info("Caching GM Handbook data...");
        CacheUtil.writeToFile(CACHE_FILE, Lawnmower.getGson().toJson(cache));
    }
    
    public static int getIdOfObject(String object) {
        return cache.map.getOrDefault(object, 0);
    }
    
    public static String readFromFile(File file) {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(file));
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } catch (IOException exception) {
            Lawnmower.getLogger().error("Failed to read file: " + file.getName(), exception);
            return "";
        }
    }
    
    public static void writeToFile(File file, String content) {
        try {
            file.createNewFile();
            
            Lawnmower.getLogger().debug("Writing to file: " + file.getName());
            var writer = new FileWriter(file); writer.write(content); writer.close();
        } catch (IOException exception) {
            Lawnmower.getLogger().error("Failed to write to file: " + file.getName(), exception);
        }
    }
}

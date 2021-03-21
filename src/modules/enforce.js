import { MessageEmbed } from "discord.js";
import { Colors } from "../colors.js";

export function enforceAdmin(msg) {
    let check = msg.member.hasPermission("ADMINISTRATOR");

    if (!check) {
        let embed = new MessageEmbed()
            .setColor(Colors.RED)
            .setTitle("Permission Denied")
            .setDescription("Only an admin can run this command");

        msg.channel.send(embed);
    }

    return check;
}

export function enforceParams(msg, predicate, usage) {
    if (!predicate) {
        let embed = new MessageEmbed()
            .setColor(Colors.RED)
            .setTitle("Invalid command parameters")
            .setDescription(`Usage: ${usage}`);
        msg.channel.send(embed);
    }

    return predicate;
}

const htmlEncode = (str) => {
    return str ? str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2f;') : '';
};

module.exports = async (ctx) => {
    try {
        const { id, limit } = ctx.request.query;

        if (!id) {
            ctx.throw(400, 'ID is required');
        }

        let data;
        try {
            data = await ctx.redis.get(`danmaku${id}`);
            if (data) {
                data = JSON.parse(data);
                ctx.response.set('X-Koa-Redis', 'true');
            }
        } catch (err) {
            console.error('Redis error:', err);
            data = null;
        }

        if (!data) {
            try {
                data = await ctx.mongodb.find({ player: id }) || [];
                ctx.redis.set(`danmaku${id}`, JSON.stringify(data), 'EX', 3600); // 设置1小时的TTL
                ctx.response.set('X-Koa-Mongodb', 'true');
            } catch (err) {
                console.error('MongoDB error:', err);
                ctx.throw(500, 'Internal Server Error');
            }
        }

        if (limit) {
            const limitNum = parseInt(limit);
            if (!isNaN(limitNum) && limitNum > 0) {
                data = data.slice(-limitNum);
            }
        }

        ctx.body = JSON.stringify({
            code: 0,
            data: data.map((item) => [
                item.time || 0,
                item.type || 0,
                item.color || 16777215,
                htmlEncode(item.author) || 'DPlayer',
                htmlEncode(item.text) || '',
            ]),
        });
    } catch (err) {
        console.error('General error:', err);
        ctx.throw(500, 'Internal Server Error');
    }
};
